export default function (name, clientURL) {

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
    </head>

    <body style="
        margin: 0;
        padding: 40px 0;
        background: #f4f7fb;
        font-family: Arial, sans-serif;
    ">

        <div style="
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 35px rgba(0,0,0,0.08);
        ">

            <div style="
                padding: 45px 30px;
                text-align: center;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
            ">
                <h1 style="margin: 0; font-size: 36px;">
                    Welcome 🎉
                </h1>

                <p style="margin: 12px 0 0; font-size: 17px;">
                    We're happy to have you with us
                </p>
            </div>

            <div style="padding: 40px 35px; color: #333;">

                <h2 style="margin-top: 0;">
                    Hello ${name} 👋
                </h2>

                <p style="font-size: 16px; line-height: 1.7;">
                    Your account has been successfully created.
                    We're excited to have you as part of our community.
                </p>

                <p style="font-size: 16px; line-height: 1.7;">
                    You can now log in and start exploring everything
                    we have prepared for you.
                </p>

                <div style="text-align: center; margin: 35px 0;">
                    <a href="${clientURL}"
                       style="
                        display: inline-block;
                        padding: 15px 35px;
                        background: #667eea;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 10px;
                        font-size: 16px;
                        font-weight: bold;
                    ">
                        Get Started →
                    </a>
                </div>

                <p style="
                    font-size: 14px;
                    color: #888;
                    text-align: center;
                    margin-bottom: 0;
                ">
                    Thank you for joining us ❤️
                </p>

            </div>

            <div style="
                padding: 20px;
                text-align: center;
                background: #f8f9fc;
                color: #999;
                font-size: 12px;
            ">
                © 2026 Your App. All rights reserved.
            </div>

        </div>

    </body>
    </html>
    `;
};