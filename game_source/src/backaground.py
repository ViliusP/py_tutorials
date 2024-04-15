import math
import pygame
import random

class StaryNightBackground:
    def __init__(self, stars_count: int, background_size: tuple[int, int]):
        self.stars_count = stars_count 
        self.surface = pygame.Surface(background_size, pygame.SRCALPHA)
        self.stars = []
        for i in range(stars_count):
            x = random.randint(0, background_size[0])
            y = random.randint(0, background_size[1])
            star_size = random.randint(2, 5)
            self.stars.append(Star(x, y, star_size))


    def draw(self, screen: pygame.Surface):
        for star in self.stars:
            star.draw(self.surface)

        screen.blit(self.surface, (0, 0))

    def update(self, dt: float):
        for star in self.stars:
            star.update(dt)

class Star:
    def __init__(self, x: int, y: int, size: int) -> None:
        self.x = x
        self.y = y
        self.size = size
        self.blur = 0
        self.color = (255, 255, 255)
        self.surface = pygame.Surface((size, size), pygame.SRCALPHA)

    def update(self, dt: float):
        self.blur = math.sin(dt*0.01)+1

    def draw(self, screen: pygame.Surface):
        pygame.draw.circle(self.surface, self.color, (self.x, self.y), self.size)
        surface = pygame.transform.gaussian_blur(self.surface, self.blur)
        screen.blit(surface, (self.x, self.y))