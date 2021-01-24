package raineduc.web4.rest_providers.exception_mappers;

import raineduc.web4.rest_entities.ValidationError;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON_TYPE;
import static javax.ws.rs.core.Response.Status.BAD_REQUEST;

@Provider
public class ValidationMapper implements ExceptionMapper<ConstraintViolationException> {
    @Override
    public Response toResponse(ConstraintViolationException e) {
        return Response.status(BAD_REQUEST)
                .entity(new ValidationError(getFirstErrorMessage(e), getFieldName(e)))
                .type(APPLICATION_JSON_TYPE)
                .build();
    }

    public String getFieldName(ConstraintViolationException e) {
        ConstraintViolation<?> violation = e.getConstraintViolations().iterator().next();
        String field = null;
        for (Path.Node node: violation.getPropertyPath()) {
            field = node.getName();
        }
        return field;
    }

    public String getFirstErrorMessage(ConstraintViolationException e) {
        return e.getConstraintViolations().iterator().next().getMessage();
    }
}
