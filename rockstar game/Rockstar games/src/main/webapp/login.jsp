<%@ page import="java.sql.*,java.security.MessageDigest" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Log In - Rockstar Games</title>

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
                margin: 0;
            }

            .login-box {
                background: #111;
                padding: 40px;
                border-radius: 8px;
                width: 100%;
                max-width: 400px;
                text-align: center;
                border: 1px solid #333;
            }

            .login-logo {
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
                box-sizing: border-box;
            }

            button {
                width: 100%;
                padding: 14px;
                background: #f0c14b;
                border: none;
                font-weight: bold;
                cursor: pointer;
                margin-top: 10px;
            }

            button:hover {
                background: #ddb347;
            }

            .msg {
                margin-top: 15px;
            }

            .signup-link {
                display: block;
                margin-top: 20px;
                color: #ccc;
                text-decoration: none;
                font-size: 14px;
            }

            .signup-link:hover {
                color: white;
                text-decoration: underline;
            }
        </style>
    </head>

    <body>

        <div class="login-box">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Rockstar_Games_Logo.svg" class="login-logo"
                alt="Rockstar Games">

            <h1>Log In to Social Club</h1>

            <div id="clientErrorMsg" class="msg" style="color:red; display:none; margin-bottom:15px;"></div>

            <form id="loginForm" method="post">
                <div class="input-group">
                    <label>Email</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="input-group">
                    <label>Password</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <div class="input-group">
                    <label>Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                </div>

                <button type="submit">Log In</button>
            </form>

            <script>
                document.getElementById('loginForm').addEventListener('submit', function(e) {
                    var emailInput = document.getElementById('email').value;
                    var passwordInput = document.getElementById('password').value;
                    var confirmPasswordInput = document.getElementById('confirmPassword').value;
                    var errorDiv = document.getElementById('clientErrorMsg');
                    
                    var lastUser = localStorage.getItem('rockstar_last_user');
                    
                    if (lastUser && lastUser !== emailInput) {
                        e.preventDefault();
                        errorDiv.textContent = "Username does not match the previously signed-in account.";
                        errorDiv.style.display = "block";
                        return;
                    }
                    
                    if (passwordInput !== confirmPasswordInput) {
                        e.preventDefault();
                        errorDiv.textContent = "Passwords do not match.";
                        errorDiv.style.display = "block";
                        return;
                    }
                    
                    errorDiv.style.display = "none";
                });
            </script>

            <a href="signin.jsp" class="signup-link">Don't have an account? Sign up here.</a>

            <% String email=request.getParameter("email"); String password=request.getParameter("password"); if (email
                !=null && password !=null) { Connection con=null; PreparedStatement ps=null; ResultSet rs=null; try { //
                Hash password (basic SHA-256) to compare with stored hash MessageDigest
                md=MessageDigest.getInstance("SHA-256"); byte[] hash=md.digest(password.getBytes("UTF-8"));
                StringBuilder hexString=new StringBuilder(); for (byte b : hash) { String hex=Integer.toHexString(0xff &
                b); if(hex.length()==1) hexString.append('0'); hexString.append(hex); } String
                hashedPassword=hexString.toString(); Class.forName("org.postgresql.Driver");
                con=DriverManager.getConnection( "jdbc:postgresql://192.168.1.17:5432/cse_db24" , "24bcsg28"
                , "24bcsg28" ); String query="SELECT * FROM signin WHERE email = ? AND password = ?" ;
                ps=con.prepareStatement(query); ps.setString(1, email); ps.setString(2, hashedPassword);
                rs=ps.executeQuery(); if (rs.next()) { %>
                <div class="msg" style="color:lightgreen;">
                    Login successful! Redirecting...
                </div>
                <script>
                    sessionStorage.setItem('rockstar_user', '<%= email %>');
                    localStorage.setItem('rockstar_last_user', '<%= email %>');
                    setTimeout(function () {
                        window.location.href = 'index.html';
                    }, 1500);
                </script>
                <% } else { %>
                    <div class="msg" style="color:red;">
                        Invalid email or password.
                    </div>
                    <% } } catch (Exception e) { %>
                        <div class="msg" style="color:red;">
                            Error: <%= e.getMessage() %>
                        </div>
                        <% } finally { try { if (rs !=null) rs.close(); } catch(Exception e) {} try { if (ps !=null)
                            ps.close(); } catch(Exception e) {} try { if (con !=null) con.close(); } catch(Exception e)
                            {} } } %>

        </div>

    </body>

    </html>