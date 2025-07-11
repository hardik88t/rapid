import { sendEmail } from "./emailSender.js";

export const otpStorage = {};

// Function to generate a random 6-digit number
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};


// Function to send OTP via email
export const sendOTP = async (to, otp) => {
    const emailContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Rapid Blog Builder</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f8f8f8;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
            
                .container {
                    width: 300px;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
            
                header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                }
            
                .logo {
                    width: var(--logo-size);
                    height: var(--logo-size);
                    margin-right: 10px;
                }
            
                h2 {
                    margin: 0;
                    color: #333;
                    --logo-size: 2em; /* Set the size of the logo based on the font size of h2 */
                }
            
                .otm {
                    font-size: 1.2em;
                    color: #333;
                    margin-bottom: 10px;
                }
            
                .validity {
                    color: #666;
                }
            </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <img src="https://firebasestorage.googleapis.com/v0/b/rapid-f23c9.appspot.com/o/logo.ico?alt=media&token=8f2a2cb5-b78e-470d-9584-d798682beacd" alt="Logo" class="logo">
                        <h2>Rapid Blog Builder</h2>
                    </header>
                    <div class="otm">
                        <span id="otp">${otp}</span> 
                        is your OTP for authentication with Rapid page Builder.
                    </div>
                    <div class="validity">Valid for 10 minutes</div>
                </div>
            </body>
            </html>
        `;

    try {
        // Send the OTP via email
        await sendEmail(to, 'OTP for Registration', emailContent);
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};