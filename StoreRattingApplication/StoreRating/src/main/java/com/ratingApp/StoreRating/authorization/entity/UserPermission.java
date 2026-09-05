package com.ratingApp.StoreRating.authorization.entity;

import com.ratingApp.StoreRating.auth.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_permissions")
public class UserPermission {

    @EmbeddedId
    private UserPermissionId id = new UserPermissionId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("permissionId")
    @JoinColumn(name = "permission_id")
    private Permission permission;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Effect effect;

    public UserPermission(User user, Permission permission, Effect effect) {
        this.user = user;
        this.permission = permission;
        this.effect = effect;
        this.id = new UserPermissionId(user.getId(), permission.getId());
    }

    public enum Effect {
        ALLOW, DENY
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    public static class UserPermissionId implements Serializable {

        @Column(name = "user_id")
        private Long userId;

        @Column(name = "permission_id")
        private Integer permissionId;

        public UserPermissionId(Long userId, Integer permissionId) {
            this.userId = userId;
            this.permissionId = permissionId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof UserPermissionId that)) return false;
            return Objects.equals(userId, that.userId) && Objects.equals(permissionId, that.permissionId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(userId, permissionId);
        }
    }
}