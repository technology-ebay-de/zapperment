import React from "react";
import cx from "classnames";
import icon from "./play.svg";
import styles from "./Play.module.css";
import { Howl} from "howler";

export default ({ onPlay }) => {
  const handleClick = () => {
    console.log("play!");
    const howl = new Howl({
      src: "http://192.168.2.102:3001/stream.mp3",
      html5: true,
      format: ["mp3", "aac"]
    });
    howl.play();
    onPlay();
  };
  return (
    <button className={cx(styles.component)} onClick={handleClick}>
      <img src={icon} alt="play" className={styles.icon} />
      <span className={styles.label}>Play!</span>
    </button>
  );
};
