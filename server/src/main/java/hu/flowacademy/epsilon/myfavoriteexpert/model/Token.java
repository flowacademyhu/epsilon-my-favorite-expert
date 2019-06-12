package hu.flowacademy.epsilon.myfavoriteexpert.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;

@Entity
@Table
public class Token {

    @Id
    @Column
    private String userid;

    @Column(columnDefinition="TEXT")
    private String accesstoken;

    @Column
    private Instant createdat;

    @Column
    private Instant expriredat;

    @Column
    private boolean isdeleted;

    public Token() {
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getAccesstoken() {
        return accesstoken;
    }

    public void setAccesstoken(String accesstoken) {
        this.accesstoken = accesstoken;
    }

    public Instant getCreatedat() {
        return createdat;
    }

    public void setCreatedat(Instant createdat) {
        this.createdat = createdat;
    }

    public Instant getExpriredat() {
        return expriredat;
    }

    public void setExpriredat(Instant expriredat) {
        this.expriredat = expriredat;
    }

    public boolean isIsdeleted() {
        return isdeleted;
    }

    public void setIsdeleted(boolean isdeleted) {
        this.isdeleted = isdeleted;
    }
}
