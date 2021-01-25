package raineduc.web4.rest_entities;

import java.util.List;

public class Hits {
    private List<HitResponseData> hits;
    private long totalCount;

    public Hits(List<HitResponseData> hits, long totalCount) {
        this.hits = hits;
        this.totalCount = totalCount;
    }

    public List<HitResponseData> getHits() {
        return hits;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setHits(List<HitResponseData> hits) {
        this.hits = hits;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }
}
