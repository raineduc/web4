package raineduc.web4.rest_providers.exception_mappers;

import raineduc.web4.beans.exceptions.InternalError;
import raineduc.web4.rest_entities.CommonError;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import static javax.ws.rs.core.Response.Status.INTERNAL_SERVER_ERROR;

@Provider
public class InternalExceptionMapper implements ExceptionMapper<InternalError> {
    @Override
    public Response toResponse(InternalError internalError) {
        return Response.status(INTERNAL_SERVER_ERROR).entity(new CommonError("Something went wrong on the server")).build();
    }
}
