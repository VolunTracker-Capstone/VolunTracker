import React, { useState } from 'react';
import '../App.css'

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
        {
            question: 'What is VolunTracker?',
            answer: 'VolunTracker is used to create organizations, where you as the owner can create public events and keep track of your volunteers. VolunTracker can also be used to take part in these events and track your personal activity.'
        },
        {
            question: 'How do I create an organization?',
            answer: 'Simpy create an account or login to an existing account, then visit the organizations tab on the top of the page where you can follow simple instructions to get started.'
        },
        {
            question: 'Can I create multiple organizations?',
            answer: 'Yes you may create as many organizations as you would like.'
        },
        {
            question: 'Can I join organizations and also create my own?',
            answer: 'Yes you can do both! You are not limited to how many organizations you can join or create.'
        },
        {
            question: 'Is it necessary to create organizations?',
            answer: 'No it is not necessary, you are able to only volunteer for other organizations that have been created. However, the option to create organizations always remains in case you change your mind one day.'
        },
        {
            question: 'Do I need to pay for VolunTracker?',
            answer: 'No payment needed! VolunTracker is a completely free site that has all of our features available to everybody.'
        },
        {
            question: 'Is VolunTracker good?',
            answer: 'Our goal at VolunTracker is to provide the best possible experience for everybody. If you have any feedback for us feel free to contact us we would love to hear from you!'
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-page">
            <h1>Frequently Asked Questions</h1>
            <div className="accordion">
                {faqData.map((faq, index) => (
                    <div className="accordion-item" key={index}>
                        <div
                            className={`accordion-title ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleAccordion(index)}
                        >
                            {faq.question}
                        </div>
                        {activeIndex === index && (
                            <div className="accordion-content">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;