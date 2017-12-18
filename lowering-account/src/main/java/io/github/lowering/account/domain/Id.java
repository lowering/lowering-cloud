package io.github.lowering.account.domain;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@MappedSuperclass
public abstract class Id implements Serializable{

    //JsonView 视图
    public interface JView { };
    public interface WithoutRelationJView extends JView {};
    public interface WithRelationJView extends WithoutRelationJView {};

    @javax.persistence.Id
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @GeneratedValue(generator = "uuid")
    @Column(length = 32)
    @Length(min = 32, max = 32, message = "{account.id.id.Length.message}")
    @JsonView(JView.class)
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
