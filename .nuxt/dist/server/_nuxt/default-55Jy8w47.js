import { _ as __nuxt_component_0 } from "./nuxt-link-DZBS4QqW.js";
import { ref, mergeProps, useSSRContext, computed, unref, withCtx, createTextVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { _ as _export_sfc } from "../server.mjs";
import { u as useCookie } from "./cookie-BQ1yN6Gj.js";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ufo/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/defu/dist/defu.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/hookable/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/unctx/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/h3/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/destr/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/ohash/dist/index.mjs";
import "C:/Users/HP/Desktop/bull_frontend/node_modules/klona/dist/index.mjs";
const _sfc_main$1 = {
  __name: "NotificationSystem",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const notifications = ref([]);
    let notificationIdCounter = 0;
    const addNotification = (title, message, type = "info", duration = 5e3) => {
      const id = ++notificationIdCounter;
      const notification = {
        id,
        title,
        message,
        type,
        timestamp: Date.now()
      };
      notifications.value.push(notification);
      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }
      return id;
    };
    const removeNotification = (id) => {
      const index = notifications.value.findIndex((n) => n.id === id);
      if (index !== -1) {
        notifications.value.splice(index, 1);
      }
    };
    const clearAll = () => {
      notifications.value = [];
    };
    __expose({
      addNotification,
      removeNotification,
      clearAll
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "notification-container" }, _attrs))} data-v-f1ffb77c><div${ssrRenderAttrs({ name: "notification" })} data-v-f1ffb77c>`);
      ssrRenderList(notifications.value, (notification) => {
        _push(`<div class="${ssrRenderClass(["notification", `notification-${notification.type}`])}" data-v-f1ffb77c><div class="notification-icon" data-v-f1ffb77c>`);
        if (notification.type === "success") {
          _push(`<span data-v-f1ffb77c>✅</span>`);
        } else if (notification.type === "error") {
          _push(`<span data-v-f1ffb77c>❌</span>`);
        } else if (notification.type === "warning") {
          _push(`<span data-v-f1ffb77c>⚠️</span>`);
        } else {
          _push(`<span data-v-f1ffb77c>ℹ️</span>`);
        }
        _push(`</div><div class="notification-content" data-v-f1ffb77c><div class="notification-title" data-v-f1ffb77c>${ssrInterpolate(notification.title)}</div><div class="notification-message" data-v-f1ffb77c>${ssrInterpolate(notification.message)}</div></div><button class="notification-close" data-v-f1ffb77c> × </button></div>`);
      });
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/NotificationSystem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const NotificationSystem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f1ffb77c"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const currentRole = useCookie("authRole", { default: () => "etudiant" });
    const currentRoute = computed(() => {
      const path = route.path;
      if (["/admin", "/secretariat", "/enseignant", "/etudiant"].includes(path)) return "Dashboard";
      return path.split("/").pop().charAt(0).toUpperCase() + path.split("/").pop().substring(1);
    });
    const allLinks = [
      { path: "/etudiants", label: "Étudiants", roles: ["admin", "secretariat"] },
      { path: "/saisie", label: "Saisie Notes", roles: ["admin", "secretariat", "enseignant"] },
      { path: "/referentiels", label: "Référentiels", roles: ["admin"] },
      { path: "/deliberations", label: "Délibérations", roles: ["admin", "secretariat"] },
      { path: "/bulletins", label: "Bulletins", roles: ["admin", "secretariat", "etudiant"] },
      { path: "/profil", label: "Profil", roles: ["admin", "secretariat", "enseignant", "etudiant"] }
    ];
    const allowedLinks = computed(() => {
      return allLinks.filter((link) => link.roles.includes(currentRole.value));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-layout" }, _attrs))} data-v-54cd87b6><aside class="sidebar" data-v-54cd87b6><div class="sidebar-header" data-v-54cd87b6><h1 data-v-54cd87b6>Bull ASUR</h1></div><nav class="sidebar-nav" data-v-54cd87b6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/${unref(currentRole)}`,
        class: ["nav-link", { "router-link-active": currentRoute.value === "Dashboard" }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--[-->`);
      ssrRenderList(allowedLinks.value, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.path,
          to: link.path,
          class: "nav-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="sidebar-footer" data-v-54cd87b6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "nav-link logout-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Déconnexion `);
          } else {
            return [
              createTextVNode(" Déconnexion ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></aside><main class="main-content" data-v-54cd87b6><header class="topbar" data-v-54cd87b6><div class="breadcrumb" data-v-54cd87b6><span data-v-54cd87b6>${ssrInterpolate(currentRoute.value)}</span></div><div class="user-profile" data-v-54cd87b6><div class="avatar" data-v-54cd87b6>${ssrInterpolate(unref(currentRole).charAt(0).toUpperCase())}</div><span class="role-lbl" data-v-54cd87b6>${ssrInterpolate(unref(currentRole).toUpperCase())}</span></div></header><div class="page-container" data-v-54cd87b6>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
      _push(ssrRenderComponent(NotificationSystem, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-54cd87b6"]]);
export {
  _default as default
};
//# sourceMappingURL=default-55Jy8w47.js.map
