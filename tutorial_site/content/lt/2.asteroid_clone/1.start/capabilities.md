---
title: 'Capabilities'
description: 'Here we test the capabilities of our site'
draft: true
created_at: '2024-01-01'
updated_at: '2024-01-01'
authors:
  - 'Vilius Paliokas'
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

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et aliquet purus, et elementum lectus. Aliquam pellentesque neque arcu, sed sollicitudin erat gravida at. Pellentesque justo enim, porta ut odio nec, aliquet sollicitudin nisl.

- Just
- An
- Unordered
- List

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et aliquet purus, et elementum lectus. Aliquam pellentesque neque arcu, sed sollicitudin erat gravida at. Pellentesque justo enim, porta ut odio nec, aliquet sollicitudin nisl.

## Ordered list

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et aliquet purus, et elementum lectus. Aliquam pellentesque neque arcu, sed sollicitudin erat gravida at. Pellentesque justo enim, porta ut odio nec, aliquet sollicitudin nisl.

1. Foo
2. Bar
3. Baz
4. as
5. das
6. sdfgh
7. gsfhsf
8. 234234
9. sdvzxcvb
10. sdfsdfxcvb
11. fdsgsfdgdf
12. twelve number

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et aliquet purus, et elementum lectus. Aliquam pellentesque neque arcu, sed sollicitudin erat gravida at. Pellentesque justo enim, porta ut odio nec, aliquet sollicitudin nisl.

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

```python [data/models/game_engine.py]{7, 11, 19, 24}
# Example file showing a basic pygame "game loop"

import pygame

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720)) # highlighted code
clock = pygame.time.Clock()
running = True

while running: # highlighted code
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # fill the screen with a color to wipe away anything from last frame
    screen.fill("purple") # highlighted code

    # RENDER YOUR GAME HERE

    # flip() the display to put your work on screen
    pygame.display.flip() # highlighted code

    clock.tick(60)  # limits FPS to 60

pygame.quit()

```

## Javascript code

```js [file.js] max-width=300
export default () => {
    console.log('Code block')
}
```

Material body 1. :keyboard-keys{:keys='["ctrl", "/"]'} or :keyboard-keys{:keys='["W", "A", "S", "D"]' any}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt turpis tellus, porttitor sagittis elit interdum nec. Cras lorem mauris, porta non augue in, maximus porttitor eros. Donec pulvinar tortor odio, ut aliquam mauris aliquet quis. Curabitur facilisis aliquet aliquet. Sed condimentum, leo ut tristique maximus, nisl libero accumsan nibh, in sagittis quam lacus a sem. Nam molestie felis justo, in auctor nulla dapibus placerat. Proin eget metus sem. Proin sit amet feugiat felis, eget ultrices lorem. Nullam nibh metus, sodales in pellentesque et, lacinia eu elit. Maecenas et metus quis dolor fermentum convallis luctus sed erat. Pellentesque volutpat felis nec ipsum imperdiet, id bibendum ipsum congue. Maecenas ut vestibulum felis. Nullam vehicula eleifend ligula ac imperdiet. Nam consectetur ornare felis.

Inline code `print("Hello, Python")`{lang="python"} tristique maximus, nisl libero accumsan nibh, in sagittis quam lacus a sem. Nam molestie felis justo, in auctor nulla dapibus placerat. Proin eget metus sem. Proin sit amet feugiat felis, eget ultrices lorem. Nullam nibh metus, sodales in pellentesque et, lacinia eu elit. Maecenas et metus quis dolor fermentum convallis luctus sed erat. Pellentesque volutpat feli.

## Image

Here is a paragraph above the image. Below, there is an image with a caption.

![Colored placehold 600x400 image from https://placehold.co/](https://placehold.co/600x400/orange/white "Colored placehold 600x400 image from https://placehold.co/"){ width=600 height=400}

Here is a paragraph below the image. Above, there is an image with a caption.

Below, you will see lazy-loading example - circular progress and blurhash: 

![Colored placehold 600x400 image from https://placehold.co/](https://placehold.cos "Invalid URL gives us demo of circular progress and blurhash"){ width=600 height=400, thumbHash="ZK6CE4IPR1d3iIC4iI+L+IeHeHiAiAg="}


## Link

Lorem ipsum text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt turpis tellus, porttitor sagittis elit interdum nec. Cras lorem mauris, porta non augue in, maximus porttitor eros. Donec pulvinar tortor odio, ut aliquam mauris aliquet quis. Now link: [google](http://google.com) . Now lorem ipsum again. Maecenas et metus quis dolor fermentum convallis luctus sed erat. Pellentesque volutpat felis nec ipsum imperdiet, id bibendum ipsum congue. Maecenas ut vestibulum felis. Nullam vehicula eleifend ligula ac imperdiet. Nam consectetur ornare felis.

## Math

Below is a nonsensical math equation, but it looks cool though:

$$
\oint_{\mathcal{C}} \left( \frac{\partial \mathbf{F}}{\partial x} - \frac{y}{z} \sum_{n=0}^{\infty} \frac{e^{-nx}}{n!} \right) \cdot \left( \int_{-\infty}^{\infty} \sin(\pi x) e^{ix} \,dx \right) \,dz = \left| \begin{array}{cc} \cos(\theta) & -\sin(\theta) \\ \sin(\theta) & \cos(\theta) \end{array} \right| \cdot \left( \prod_{k=1}^{n} k^{\frac{1}{k}} \right)^{-\frac{2}{3}\pi}
$$

### The Riemann Zeta Function

A function of complex variable ss that is a sum over all natural numbers to the power of −s−s. It has deep implications in number theory, particularly in the distribution of prime numbers.

$$
\zeta(s) = \frac{1}{\Gamma(s)} \int_{0}^{\infty} \frac{x^{s-1}}{e^x - 1} \,dx = 2^{s-1} \pi^{s-2} \sin\left(\frac{\pi s}{2}\right) \Gamma(1-s) \zeta(1-s)
$$

### The Fourier Transform

This equation defines the Fourier transform $$F(x)$$ of a function $$f$$, which is a critical tool in signal processing, physics, and engineering. It transforms a function from the time (or spatial) domain to the frequency domain, revealing the frequency components of the original function.

$$
F(x) = \int_{-\infty}^{\infty} f(\mathbf{\xi}) e^{-2 \pi i \mathbf{\xi} \cdot \mathbf{x}} \,d\mathbf{\xi}
$$

## Blockquote

> You have power over your mind - not outside events. Realize this, and you will find strength.
>  
> \- Marcus Aurelius, Meditations

## Alert

### Default alert

::ProseAlert{ icon="mdi-lightbulb-cfl"}

Icon is defined with "icon" prop. More at https://content.nuxt.com/usage/markdown.

#title
Title is defined with #title slot 
::

### success

::ProseAlert{ type="success" }

type can be set with "type" prop same as in vuetify. Currently, it has default "success" icon.

#title
Success alert
::

### error

::ProseAlert{ type="error" }

type can be set with "type" prop same as in vuetify. Currently, it has default "error" icon.

#title
Error alert
::

### info

::ProseAlert{ type="info" icon="mdi-alien-outline"}

type can be set with "type" prop same as in vuetify. For your information, different than default icon can be set using "icon" prop. Currently it is set as "mdi-alien-outline"

#title
Info alert
::

### warning

::ProseAlert{ type="warning" }

type can be set with "type" prop same as in vuetify. Currently, it has default "warning" icon.

#title
Warning alert
::