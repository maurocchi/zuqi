import React from "react";
import { useTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles  } from "@material-ui/core/styles";
import { green, grey, red } from "@material-ui/core/colors";
import { LoadingButton } from "./LoadingButton";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  question: {
    marginBottom: theme.spacing(2)
  },
  answer: {
    height: theme.spacing(5),
    alignItems: 'center'
  },
  greenCheckbox: {
    color: green[600]
  },
  redCheckbox: {
    color: red[700]
  },
  answerProgress: {
    color: grey[700]
  }
}));

export function ChallengeButton({ onChallenge, disabled, challenging }) {
  const { t } = useTranslation();
  return (
    <LoadingButton
      variant="contained"
      color="primary"
      disabled={disabled}
      loading={challenging}
      onClick={onChallenge}
    >
      {t("Challenge")}
    </LoadingButton>
  );
}

export function QuestionPanel({ question, children }) {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography className={classes.question} variant="h5">
        {t(question)}
      </Typography>
      {children}
    </Paper>
  );
}

export function QuestionAnswers({ answers, onSelect }) {
  return (
    <List>
      {answers.map((answer, index) => {
        return (
          <QuestionAnswer
            key={index}
            index={index}
            text={answer.text}
            status={answer.status}
            onSelect={onSelect}
          />
        );
      })}
    </List>
  );
}

function QuestionAnswer({ index, text, status, onSelect }) {
  const classes = useStyles();
  const id = `answer-${index}`;
  return (
    <ListItem
      key={id}
      className={classes.answer}
      button
      onClick={() => onSelect(index)}
    >
      <ListItemIcon>
        <QuestionIcon status={status} />
      </ListItemIcon>
      <ListItemText id={id} primary={text} />
    </ListItem>
  );
}

function QuestionIcon({ status }) {
  const { greenCheckbox, redCheckbox, answerProgress } = useStyles();
  if (status === "loading") {
    return (
      <CircularProgress size={18} className={answerProgress} />
    );
  }
  if (status === "success" || status === "failure") {
    return (
      <Checkbox
        className={status === "success" ? greenCheckbox : redCheckbox}
        color="default"
        edge="start"
        checked={true}
      />
    );
  }
  return <Checkbox edge="start" checked={false} />;
}