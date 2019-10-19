from box import Box


class Session:
    def __init__(self, quiz):
        self.quiz = quiz
        self.users = {}

    def add_user(self, user):
        self.users[user] = True

    def remove_user(self, user):
        self.users[user] = False

    def is_user_present(self, user):
        return user in self.users

    def is_user_active(self, user):
        return self.users.get(user, False)


class Conductor:
    def __init__(self, quiz_source):
        self.quiz_source = quiz_source
        self.session = None

    async def new_session(self):
        quiz = await self.quiz_source.next()
        self.session = Session(quiz)

    async def on_enter(self, network, user):
        pass

    async def on_message(self, network, message):
        if not self.session.is_user_present(message.source) and message.payload.action == 'join':
            return await self._handle_join(network, message)
        if not self.session.is_user_active(message.source):
            return
        if message.payload.action == 'challenge':
            return await self._handle_challenge(network, message)
        if message.payload.action == 'answer':
            return await self._handle_answer(network, message)

    async def _handle_join(self, network, message):
        await network.send(message.source, Box(question=self.session.quiz.question))
        await network.publish(Box(event='joined', user=message.source))
        self.session.add_user(message.source)

    async def _handle_challenge(self, network, message):
        await network.send(message.source, Box(action='reply', answers=self.session.quiz.answers))
        await network.publish(Box(event='challenging', user=message.source))

    async def _handle_answer(self, network, message):
        ok = message.payload.answer == self.session.quiz.answer
        if ok:
            await network.publish(Box(event='winner', user=message.source))
        else:
            self.session.remove_user(message.source)
            await network.publish(Box(event='removed', user=message.source))

    async def on_exit(self, network, user):
        pass