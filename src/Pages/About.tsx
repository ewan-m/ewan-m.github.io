import React from 'react';
import './About.css';
import Me from '../Assets/profile.jpg';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

export const About = () => {
    return (
        <div className="centered-flex">
            <div className="about-panel">
                <img alt="my face" src={Me} className="profile-image"></img>
                <h1 className="ewan">
                    Ewan Morrison
                </h1>
                <h2 className="job-title">
                    Software Engineer
                </h2>
                <div className="centered-flex">
                    <a href="https://www.linkedin.com/in/ewan-morrison/" target="blank">
                        <div className="social-icon-container">
                            <FaLinkedin className="social-icon" />
                        </div>
                    </a>
                    <a href="https://www.twitter.com/ewanm5" target="blank">
                        <div className="social-icon-container">
                            <FaTwitter className="social-icon" />
                        </div>
                    </a>
                    <a href="https://www.instagram.com/ewanmorrison_" target="blank">
                        <div className="social-icon-container">
                            <FaInstagram className="social-icon" />
                        </div>
                    </a>
                    <a href="https://www.github.com/ewan-m" target="blank">
                        <div className="social-icon-container">
                            <FaGithub className="social-icon" />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
