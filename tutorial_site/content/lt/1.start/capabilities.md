---
title: 'Capabilities'
description: 'Here we test the capabilities of our site'
draft: true
---

Above, you should see the title in H1 tags. This text is considered a description, so it has a different style than a prose paragraph.

## H2 heading

H2 heading

### H3 heading

H3 heading

#### H4 heading

##### H5 Heading

###### H6 Heading

H4 H5 H6 headings shouldn't be used.

## Divider

Divider under

---

Divider above

## Just an unordered list

- Just
- An
- Unordered
- List

## Ordered list

1. Foo
2. Bar
3. Baz

## Just a paragraph

Just a paragraph.

## Strong paragraph

**Just a strong paragraph.**

## Italic paragraph

Not italic, _an italic part of the paragraph_. This one is also not italic.

## Table

| Key | Type      | Description |
| --- | --------- | ----------- |
| 1   | Wonderful | Table       |
| 2   | Wonderful | Data        |
| 3   | Wonderful | Website     |

## Python code

```python
# Example file showing a basic pygame "game loop"

import pygame

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # fill the screen with a color to wipe away anything from last frame
    screen.fill("purple")

    # RENDER YOUR GAME HERE

    # flip() the display to put your work on screen
    pygame.display.flip()

    clock.tick(60)  # limits FPS to 60

pygame.quit()

```

## Javascript code

```js [file.js]{4-6,7} max-width=300
export default () => {
    console.log('Code block')
}
```

Material body 1. :keyboard-shortcut{:keys='["ctrl", "/"]'}  

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt turpis tellus, porttitor sagittis elit interdum nec. Cras lorem mauris, porta non augue in, maximus porttitor eros. Donec pulvinar tortor odio, ut aliquam mauris aliquet quis. Curabitur facilisis aliquet aliquet. Sed condimentum, leo ut tristique maximus, nisl libero accumsan nibh, in sagittis quam lacus a sem. Nam molestie felis justo, in auctor nulla dapibus placerat. Proin eget metus sem. Proin sit amet feugiat felis, eget ultrices lorem. Nullam nibh metus, sodales in pellentesque et, lacinia eu elit. Maecenas et metus quis dolor fermentum convallis luctus sed erat. Pellentesque volutpat felis nec ipsum imperdiet, id bibendum ipsum congue. Maecenas ut vestibulum felis. Nullam vehicula eleifend ligula ac imperdiet. Nam consectetur ornare felis. 

Inline code `print("Hello, Python")`{lang="python"} tristique maximus, nisl libero accumsan nibh, in sagittis quam lacus a sem. Nam molestie felis justo, in auctor nulla dapibus placerat. Proin eget metus sem. Proin sit amet feugiat felis, eget ultrices lorem. Nullam nibh metus, sodales in pellentesque et, lacinia eu elit. Maecenas et metus quis dolor fermentum convallis luctus sed erat. Pellentesque volutpat feli.

## Image 

Here is a paragraph above the image. Below, there is an image with a caption.

![Colored placehold 600x400 image from https://placehold.co/](https://placehold.co/600x400/orange/white "Colored placehold 600x400 image from https://placehold.co/"){ width=600 height=400}

Here is a paragraph below the image. Above, there is an image with a caption.

## Link

Lorem ipsum text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt turpis tellus, porttitor sagittis elit interdum nec. Cras lorem mauris, porta non augue in, maximus porttitor eros. Donec pulvinar tortor odio, ut aliquam mauris aliquet quis. Now link: [google](http://google.com) . Now lorem ipsum again. Maecenas et metus quis dolor fermentum convallis luctus sed erat. Pellentesque volutpat felis nec ipsum imperdiet, id bibendum ipsum congue. Maecenas ut vestibulum felis. Nullam vehicula eleifend ligula ac imperdiet. Nam consectetur ornare felis.
