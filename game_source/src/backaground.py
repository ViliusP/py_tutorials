import math
import pygame
import random
from pygame import gfxdraw

class StaryNightBackground:
    def __init__(self, stars_count: int, background_size: tuple[int, int]):
        self.stars_count = stars_count 
        self.surface = pygame.Surface(background_size, pygame.SRCALPHA)
        self.stars = []
        for _ in range(stars_count):
            x = random.randint(0, background_size[0])
            y = random.randint(0, background_size[1])
            star_size = random.randint(5, 15)
            self.stars.append(Star(x, y, star_size))


    def draw(self, screen: pygame.Surface):
        for star in self.stars:
            star.draw(self.surface)

        screen.blit(self.surface, (0, 0))

    def update(self, dt: float):
        for star in self.stars:
            star.update()

class Star:
    def __init__(self, x: int, y: int, size: int) -> None:
        self.x = x
        self.y = y
        self.size = size
        self.blur_offset = random.randint(0, 5000)
        self.blur_rate_modifier = random.randint(1, 5)
        self.color = (255, 255, 255)
        self.surface = pygame.Surface((size*2, size*2), pygame.SRCALPHA)
        gfxdraw.filled_circle(self.surface, int(self.size), int(self.size), int(self.size/4), self.color)

    def update(self):
        max_blur = 10
        self.blur = (max_blur/2)*(math.sin((0.0008/self.blur_rate_modifier)*pygame.time.get_ticks()+self.blur_offset)+1)
        print(self.blur)
        

    def draw(self, screen: pygame.Surface):
        surface = pygame.transform.gaussian_blur(self.surface, int(self.blur))
        screen.blit(surface, (self.x, self.y))