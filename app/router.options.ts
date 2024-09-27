import type { RouterConfig } from '@nuxt/schema'

function findHashPosition(hash: string): { el: any, behavior: ScrollBehavior, top: number } | undefined {
  const el = document.querySelector(hash)
  if (el) {
    const scrollPadding = 16
    const toolbarSize = 64
    // const top = parseFloat(getComputedStyle(el).marginLeft) + scrollPadding

    return {
      el: hash,
      behavior: 'smooth',
      top: toolbarSize + scrollPadding 
    }
  }
}

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()

    if (history.state && history.state.stop) {
      return
    }
    if (history.state && history.state.smooth) {
      return {
        el: history.state.smooth,
        behavior: 'smooth'
      }
    }

    // If history back
    if (savedPosition) {
      if (to.path === from.path) {
        return {
          left: savedPosition.left,
          top: savedPosition.top,
          behavior: 'smooth'
        }
      }
      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce('page:finish', () => {
          setTimeout(() => resolve({
            left: savedPosition.left,
            top: savedPosition.top,
            behavior: 'smooth'
          }), 50)
        })
      })
    }

    // Scroll to heading on click
    if (to.hash) {
      return new Promise((resolve) => {
        if (to.path === from.path) {
          setTimeout(() => resolve(findHashPosition(to.hash)), 50)
        } else {
          nuxtApp.hooks.hookOnce('page:finish', () => {
            setTimeout(() => resolve(findHashPosition(to.hash)), 50)
          })
        }
      })
    }

    // Scroll to top of window
    return new Promise(resolve => {
      const nuxtApp = useNuxtApp();
      nuxtApp.hooks.hookOnce('page:transition:finish', () => {
        // Small delay to ensure the page is ready
        setTimeout(() => resolve({ top: 0 }), 50);
      });
    });
  }
}
