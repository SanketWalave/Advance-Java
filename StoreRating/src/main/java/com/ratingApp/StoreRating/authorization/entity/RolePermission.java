package com.ratingApp.StoreRating.authorization.entity;

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
@Table(name = "role_permissions")
public class RolePermission {

    @EmbeddedId
    private RolePermissionId id = new RolePermissionId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("roleId")
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("permissionId")
    @JoinColumn(name = "permission_id")
    private Permission permission;

    public RolePermission(Role role, Permission permission) {
        this.role = role;
        this.permission = permission;
        this.id = new RolePermissionId(role.getId(), permission.getId());
    }

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    public static class RolePermissionId implements Serializable {

        @Column(name = "role_id")
        private Integer roleId;

        @Column(name = "permission_id")
        private Integer permissionId;

        public RolePermissionId(Integer roleId, Integer permissionId) {
            this.roleId = roleId;
            this.permissionId = permissionId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof RolePermissionId that)) return false;
            return Objects.equals(roleId, that.roleId) && Objects.equals(permissionId, that.permissionId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(roleId, permissionId);
        }
    }
}