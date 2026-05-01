<%@ page import="java.sql.*,java.security.MessageDigest" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign In - Rockstar Games</title>

        <link rel="icon" type="image/png" sizes="32x32"
            href="https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/meta-icons/rockstar/favicon-32x32.png">

        <style>
            body {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background: #000;
                color: white;
                font-family: Arial, sans-serif;
            }

            .signin-box {
                background: #111;
                padding: 40px;
                border-radius: 8px;
                width: 100%;
                max-width: 400px;
                text-align: center;
                border: 1px solid #333;
            }

            .signin-logo {
                width: 60px;
                margin-bottom: 24px;
            }

            h1 {
                margin-bottom: 30px;
            }

            .input-group {
                margin-bottom: 20px;
                text-align: left;
            }

            label {
                display: block;
                margin-bottom: 8px;
                font-size: 14px;
                color: #ccc;
            }

            input {
                width: 100%;
                padding: 12px;
                border-radius: 4px;
                border: 1px solid #333;
                background: #222;
                color: white;
            }

            button {
                width: 100%;
                padding: 14px;
                background: #f0c14b;
                border: none;
                font-weight: bold;
                cursor: pointer;
            }

            button:hover {
                background: #ddb347;
            }

            .msg {
                margin-top: 15px;
            }
            .login-link {
                display: block;
                margin-top: 20px;
                color: #ccc;
                text-decoration: none;
                font-size: 14px;
            }
            .login-link:hover {
                color: white;
                text-decoration: underline;
            }
        </style>
    </head>

    <body>

        <div class="signin-box">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Rockstar_Games_Logo.svg" class="signin-logo">

            <h1>Sign In with Social Club</h1>

            <form method="post" onsubmit="return validateForm()">
                <div class="input-group">
                    <label>Email</label>
                    <input type="email" name="email" required>
                </div>

                <div class="input-group">
                    <label>Password</label>
                    <input type="password" name="password" required>
                </div>

                <button type="submit">Sign In</button>
            </form>

            <a href="login.jsp" class="login-link" style="display: block; margin-top: 20px; color: #ccc; text-decoration: none; font-size: 14px;">Already have an account? Log In here.</a>

            <% String email=request.getParameter("email"); String password=request.getParameter("password"); if (email
                !=null && password !=null) { Connection con=null; PreparedStatement ps=null; try { // Hash password
                (basic SHA-256) MessageDigest md=MessageDigest.getInstance("SHA-256"); byte[]
                hash=md.digest(password.getBytes("UTF-8")); StringBuilder hexString=new StringBuilder(); for (byte b :
                hash) { String hex=Integer.toHexString(0xff & b); if(hex.length()==1) hexString.append('0');
                hexString.append(hex); } String hashedPassword=hexString.toString();
                Class.forName("org.postgresql.Driver");
                con=DriverManager.getConnection( "jdbc:postgresql://192.168.1.17:5432/cse_db24" , "24bcsg28"
                , "24bcsg28" ); String query="INSERT INTO signin(email, password) VALUES (?, ?)" ;
                ps=con.prepareStatement(query); ps.setString(1, email); ps.setString(2, hashedPassword); int
                result=ps.executeUpdate(); if (result> 0) {
                %>
                <div class="msg" style="color:lightgreen;">
                    Data stored successfully! Redirecting...
                </div>
                <script>
                    setTimeout(function () {
                        window.location.href = 'login.jsp';
                    }, 1500);
                </script>
                <% } else { %>
                    <div class="msg" style="color:red;">
                        Failed to store data.
                    </div>
                    <% } } catch (Exception e) { %>
                        <div class="msg" style="color:red;">
                            Error: <%= e.getMessage() %>
                        </div>
                        <% } finally { try { if (ps !=null) ps.close(); } catch(Exception e) {} try { if (con !=null)
                            con.close(); } catch(Exception e) {} } } %>

        </div>

        <script>
            function validateForm() {
                const password = document.querySelector('input[name="password"]').value;
                const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
                if (!passRegex.test(password)) {
                    alert('Password must be at least 8 characters, with one letter, one number, and one special character.');
                    return false;
                }
                return true;
            }
        </script>
    </body>

    </html>