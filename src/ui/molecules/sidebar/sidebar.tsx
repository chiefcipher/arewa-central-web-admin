import React from "react";
import styles from "./sidebar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { ArewaCentralPNG, ArewaCentralWEBP } from "../../../shared/assets";
import { Pages, SuperAdminPages } from "../../../shared/pages";
import { Icon } from "@iconify/react";
export function Sidebar(): JSX.Element {
  return (
    <div className={styles.sidebar}>
      <Link to="/" className={styles.logo}>
        <picture>
          <source srcSet={ArewaCentralWEBP} type="image/webp" />
          <img src={ArewaCentralPNG} alt="Arewa Central " />
        </picture>
        <h2>Arewa Central</h2>
      </Link>
      <h3>Menu</h3>
      <div className={styles.menu}>
        <NavLink
          to={Pages.category}
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : undefined
          }
        >
          <Icon icon="material-symbols:category" />
          <span>Category</span>
        </NavLink>
        <NavLink
          to={Pages.product}
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : undefined
          }
        >
          <Icon icon="fa:product-hunt" />
          <span>Product</span>
        </NavLink>
        <NavLink
          to={Pages.message}
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : undefined
          }
        >
          <Icon icon="ant-design:message-filled" />
          <span>Message</span>
        </NavLink>
        <NavLink
          to={Pages.order}
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : undefined
          }
        >
          <Icon icon="icon-park-solid:order" />
          <span>Order</span>
        </NavLink>
      </div>

      <h3>Super Admin</h3>
      <div className={styles.menu}>
        <NavLink
          to={SuperAdminPages.manage_admin}
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : undefined
          }
        >
          <Icon icon="ri:admin-line" />
          <span>Manage Admin</span>
        </NavLink>
        <NavLink
          to={SuperAdminPages.manage_users}
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : undefined
          }
        >
          <Icon icon="ph:user-fill" />
          <span>Manage Users</span>
        </NavLink>
      </div>

      <h3>Actions</h3>
      <div className={styles.menu}>
        <NavLink
          to={Pages.profile}
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : undefined
          }
        >
          <Icon icon="ri:admin-line" />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to={Pages.logout}
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : undefined
          }
        >
          <Icon icon="ri:admin-line" />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
}
