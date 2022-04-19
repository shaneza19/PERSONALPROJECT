import classes from "./ProfileImage.module.css";
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import profileImg from '../../assets/images/profileImg.png';

export function ProfileImage() {

  const { user } = useContext(AuthContext);

    return (
      <div>
        <img
          className={classes.ProfileImage}
          src={user.profile_img || profileImg}
          alt="profile pic"
        />
      </div>
    );
  }


  


