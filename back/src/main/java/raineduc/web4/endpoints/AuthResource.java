package raineduc.web4.endpoints;

import raineduc.web4.beans.AuthBean;
import raineduc.web4.beans.exceptions.AuthException;
import raineduc.web4.beans.exceptions.InternalError;
import raineduc.web4.entities.User;
import raineduc.web4.rest_entities.CommonError;
import raineduc.web4.rest_entities.Credentials;
import raineduc.web4.rest_entities.LoginStatus;
import raineduc.web4.rest_entities.ValidationError;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import static javax.ws.rs.core.Response.Status.BAD_REQUEST;
import static javax.ws.rs.core.Response.Status.INTERNAL_SERVER_ERROR;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource {
    @Inject
    private AuthBean authService;

    @GET
    @Path("/login")
    public Response checkLoginStatus(@Context HttpServletRequest request) {
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        return Response.ok().entity(new LoginStatus(user != null)).build();
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(@Valid Credentials credentials, @Context HttpServletRequest request) {
        try {
            HttpSession session = request.getSession();
            User user = authService.login(credentials.getLogin(), credentials.getPassword());
            session.setAttribute("user", user);
            return Response.ok().build();
        } catch (AuthException e) {
            return Response.status(BAD_REQUEST).entity(new ValidationError(e.getMessage(), e.getField())).build();
        }
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response register(@Valid Credentials credentials, @Context HttpServletRequest request) {
        try {
            HttpSession session = request.getSession();
            User user = authService.register(credentials.getLogin(), credentials.getPassword());
            session.setAttribute("user", user);
            return Response.ok().build();
        } catch (AuthException e) {
            return Response.status(BAD_REQUEST).entity(new ValidationError(e.getMessage(), e.getField())).build();
        }
    }
}
