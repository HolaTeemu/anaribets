import classes from "../styles/TeamLogo.module.scss";

const TeamLogo = (props) => {
  return (
    <>
      <img
        src={require(`../assets/logos/${props.team}.svg`)}
        className={classes.teamLogo}
        alt={`${props.team} logo`}
        style={props.width}
      />
    </>
  );
};

export default TeamLogo;