<template>
    <div class="avatar-container">
        <v-avatar class="colored-avatar" :color="avatarColor" :size="size">
            <span class="initials" :style="initialsStyle">{{ initials }}</span>
        </v-avatar>
        <span class="author-name" :style="authorNameStyle">{{ authorName }}</span>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { useTheme } from "vuetify";

interface Author {
    name: string
    surname: string
    lightColor?: string
    darkColor?: string
}

const theme = useTheme();

// Define props for the component
const props = defineProps<{ author: Author; size?: number }>()
// Compute the initials from the author's name and surname
const authorName = computed(() => {
    if (props.author.surname)
        return `${props.author.name} ${props.author.surname[0]}.`
    return props.author.name
})

// Compute the initials from the author's name and surname
const initials = computed(() => {
    const nameParts = props.author.name.split(' ')
    const surnameInitial = props.author.surname ? props.author.surname[0] : ''
    return `${nameParts[0][0]}${surnameInitial}`
})

// Function to generate a color based on the name
const generateColor = (name: string) => {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`
    return color
}

// Compute the avatar color based on Vuetify's dark theme
const avatarColor = computed(() => {
    const isDarkMode = theme.global.current.value.dark
    if (isDarkMode) {
        return props.author.darkColor || generateColor(props.author.name)
    } else {
        return props.author.lightColor || generateColor(props.author.name)
    }
})

// Default size to 36 if not provided
const size = computed(() => props.size || 32)

// Compute the font size for the initials based on the avatar size
const initialsStyle = computed(() => {
    return {
        fontSize: `${size.value * 0.42}px` // Adjust this factor as necessary
    }
})

// Compute the font size for the author name based on the avatar size
const authorNameStyle = computed(() => {
    return {
        fontSize: `${size.value * 0.56}px` // Adjust this factor as necessary
    }
})
</script>

<style scoped>
.avatar-container {
    display: flex;
    align-items: center;
}

.colored-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
}

.author-name {
    margin-left: 10px;
}
</style>