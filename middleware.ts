import { logout } from "./middleware/logout";
import { socialAuth } from "./middleware/social-auth";
import { stackMiddleware } from "./middleware/stack-middleware";
import { withAuthorization } from "./middleware/with-authorization";

export default stackMiddleware([logout, socialAuth, withAuthorization]);
