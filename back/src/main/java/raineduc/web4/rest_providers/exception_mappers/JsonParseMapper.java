package raineduc.web4.rest_providers.exception_mappers;

import com.fasterxml.jackson.core.JsonParseException;
import raineduc.web4.rest_entities.CommonError;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON_TYPE;
import static javax.ws.rs.core.Response.Status.BAD_REQUEST;

@Provider
public class JsonParseMapper implements ExceptionMapper<JsonParseException> {
    @Override
    public Response toResponse(JsonParseException e) {
        return Response.status(BAD_REQUEST)
                .entity(new CommonError("The provided request body is incorrect"))
                .type(APPLICATION_JSON_TYPE)
                .build();
    }
}
