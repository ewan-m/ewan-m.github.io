import React from 'react';
import './About.css';
import Me from '../Assets/profile.jpg';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

export const About = () => {
    return (
        <div className="centered-flex">
            <div className="about-panel">
                <h1>
                    arXplorer
                </h1>
                <p>
                    this page was made because i wanted to learn react - a frontend web framework. in the process i realized that maybe i had a thing some people might find useful so i decided to publish it.
                </p>
                <p>
                    i did a physics degree at the university of edinburgh and i always thought that arXiv's design could do with some updating so decided to do it myself.
                </p>
                <p>
                    check out my github for the source code n feel free to send me a pull request if you wanna add some features!
                </p>
                <p>
                    check out my instagram for some nice pics of sunsets, linkedin for professional purposes, and twitter for general bullshit.
                </p>
            </div>
            <div className="about-panel">

                <h2>
                    Ewan Morrison
                </h2>
                <label className="slick-description">
                    Software Engineer, Edinburgh UK
                </label>
                <div className="centered-flex">
                    <img alt="my face" src={Me} className="profile-image"></img>

                    <div>
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
        </div>
    );
}
