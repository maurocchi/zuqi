from environs import Env

env = Env()
env.read_env()

port = env.int('PORT')
log_level = env('LOG_LEVEL')
challenge_timeout_seconds = env.int('CHALLENGE_TIMEOUT_SECONDS')
max_sockets = env.int('MAX_SOCKETS')
seconds_before_new_session = env.int('SECONDS_BEFORE_NEW_SESSION')
static_files_path = env('STATIC_FILES_PATH', None)
trivia_max_fetch_tentatives = env.int('TRIVIA_MAX_FETCH_TENTATIVES')
trivia_fetch_size = env.int('TRIVIA_FETCH_SIZE')