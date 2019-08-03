import React from 'react';
import './About.css';
import Me from '../Assets/profile.jpg';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

function About() {
    return (
        <div className="d-flex justify-content-center">
            <div className="about-panel p-3 shadow">
                <h1>
                    hello
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
                    check out my instagram for some nice pics of sunsets, linkedin for professional purposes, and twitter for poorly conceived jokes.
                </p>
                <h2 className="text-right">
                    -ewan morrison
                </h2>
                <hr></hr>
                <div className="d-flex justify-content-center">
                    <img alt="its a pic of my face" src={Me} className="rounded-circle w-25 mb-2 shadow-sm"></img>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <a href="https://www.linkedin.com/in/ewan-morrison/" target="blank">
                        <div className="social-icon-container shadow-sm mr-1">
                            <FaLinkedin className="social-icon" />
                        </div>
                    </a>
                    <a href="https://www.twitter.com/ewanm5" target="blank">
                        <div className="social-icon-container shadow-sm mr-1">
                            <FaTwitter className="social-icon" />
                        </div>
                    </a>
                    <a href="https://www.instagram.com/ewanmorrison_" target="blank">
                        <div className="social-icon-container shadow-sm mr-1">
                            <FaInstagram className="social-icon" />
                        </div>
                    </a>
                    <a href="https://www.github.com/ewan-m" target="blank">
                        <div className="social-icon-container shadow-sm">
                            <FaGithub className="social-icon" />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default About;
