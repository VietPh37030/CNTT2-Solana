const UserService = require("../../services/userService");
const HttpResponse = require("../../utils/httpResponse");

class UserController {
    postLogin = async (req, res) => {
        const { username, password } = req.body;
        // console.log(email, password);

        try {
            const data = await new UserService().login(username, password);

            if (data) {     
                // console.log(data);
                                 
                // Cập nhật trạng thái người dùng trong MongoDB
                data.status == 200 ? req.session.admin = data : null; // Store user in session
                // req.app.get('io').emit('user-login', data);
                return res.json(HttpResponse.resultAuth(data));
            } else {
                return res.json(HttpResponse.fail(HttpResponse.getErrorMessages('dataNotFound')));
            }
        } catch (error) {
            console.log(error);
            return res.json(HttpResponse.error(error));
        }
    }
}

module.exports = UserController;
