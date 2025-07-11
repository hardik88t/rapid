import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { toast } from 'react-hot-toast';

const Moreoption = ({ buttons, position, classNames }) => {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleMouseLeave = () => {
        setShowOptions(false);
    };


    return (
        <div className={"grid" + classNames} onMouseLeave={handleMouseLeave}>
            <div className="relative">
                <IoIosMore
                    className="z-10 border-gray-500 hover:bg-gray-300 hover:bg-opacity-100 mx-2 px-2 border rounded-lg w-11 h-11 cursor-pointer"
                    onClick={toggleOptions}
                />
                {showOptions && (
                    <div className={`z-10 absolute bg-slate-200 shadow-md rounded-md ${position === 'bottom' ? 'bottom-0 left-9' : ''
                        }`}>

                        {buttons.map((button, index) => (
                            <NavButton
                                key={index}
                                button={button}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const NavButton = ({ button }) => {
    const classNames = `border py-2 px-4 hover:bg-blue-300 hover:cursor-pointer ${button.className}`;

    if (button.type === 'button') {
        return (
            <div className={classNames}>
                <Link to={button.to}>
                    {button.content}
                </Link>
            </div>
        );
    } else if (button.type === 'call') {
        const handleClick = () => {
            if (!confirm(`Are you sure you want to ${button.content} this item?`)) {
                // Code to delete the item
                // console.log("Item deleted!");
                return;
            }
            const toastId = toast.loading(`${button.content} in progress`);

            fetch(button.to, { method: button.method })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    toast.success(`${button.content} successful.`);
                    // window.location.href = '/manageblogs';
                    window.location.reload();


                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                    toast.error(`Failed to ${button.content}. Please try again.`);
                })
                .finally(() => {
                    toast.dismiss(toastId);
                });
        };

        return (
            <div className={classNames} onClick={handleClick}>
                {button.content}
            </div>
        );
    } else {
        return null;
    }
};


export default Moreoption;