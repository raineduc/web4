package raineduc.web4.endpoints;

import raineduc.web4.beans.HitBean;
import raineduc.web4.entities.Hit;
import raineduc.web4.entities.User;
import raineduc.web4.rest_entities.HitRequestData;
import raineduc.web4.rest_entities.HitResponseData;
import raineduc.web4.rest_entities.Hits;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@Path("/game")
@Produces(MediaType.APPLICATION_JSON)
public class GameResource {
    @Inject
    private HitBean hitBean;

    public Response getUserHits(@Context HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        List<Hit> hits = hitBean.getHits(user.getLogin());
        List<HitResponseData> responseData = convertHitsToHitResponseData(hits);
        return Response.ok()
                .entity(new Hits(responseData, responseData.size()))
                .build();
    }

    @GET
    @Path("/hits")
    public Response getUserHits(
            @Pattern(regexp = "^\\d+$", message = "limit parameter must be a non-negative integer") @QueryParam("limit") String limit,
            @Pattern(regexp = "^\\d+$", message = "offset parameter must be a non-negative integer") @QueryParam("offset") String offset,
            @Context HttpServletRequest request
    ) {
        if (limit == null && offset == null) return getUserHits(request);
        User user = (User) request.getSession().getAttribute("user");
        int limitParam = limit == null ? 10 : Integer.parseInt(limit);
        int offsetParam = offset == null ? 0 : Integer.parseInt(offset);
        List<Hit> hits = hitBean.getHits(user.getLogin(), limitParam, offsetParam);
        long totalCount = hitBean.getCountOfHits(user.getLogin());
        List<HitResponseData> responseData = convertHitsToHitResponseData(hits);
        return Response.ok()
                .entity(new Hits(responseData, totalCount))
                .build();
    }

    @POST
    @Path("/hits")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addHit(@Valid HitRequestData hitRequestData, @Context HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        Hit hit = hitBean.addHit(hitRequestData.getX(), hitRequestData.getY(), hitRequestData.getRadius(), user);
        HitResponseData responseData = new HitResponseData(hit.getX(), hit.getY(), hit.getRadius(), hit.isHit());
        return Response.ok()
                .entity(responseData)
                .build();
    }

    @POST
    @Path("/hits/clear")
    public Response clearUserHits(@Context HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        hitBean.clear(user);
        return Response.ok().build();
    }

    protected List<HitResponseData> convertHitsToHitResponseData(List<Hit> hits) {
        return hits.stream().map(hit ->
                new HitResponseData(hit.getX(), hit.getY(), hit.getRadius(), hit.isHit())).collect(Collectors.toList());
    }
}
