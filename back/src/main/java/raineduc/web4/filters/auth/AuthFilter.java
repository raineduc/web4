package raineduc.web4.filters.auth;

import raineduc.web4.entities.User;
import raineduc.web4.rest_entities.CommonError;

import javax.annotation.Priority;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

import static javax.ws.rs.core.Response.Status.FORBIDDEN;

@Protected
@Priority(Priorities.AUTHENTICATION)
@Provider
public class AuthFilter implements ContainerRequestFilter {
    @Context
    private HttpServletRequest request;

    @Override
    public void filter(ContainerRequestContext containerRequestContext) throws IOException {
        User user = (User) request.getSession().getAttribute("user");
        if (user == null) {
            containerRequestContext.abortWith(
                    Response.status(FORBIDDEN).entity(new CommonError("You must be logged in")).build()
            );
        }
    }
}
