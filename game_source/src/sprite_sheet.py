import pygame


class SpriteSheet:
    def __init__(self, filename, sprite_width, sprite_height):
        """Initialize the sprite sheet."""
        self.sprite_sheet = pygame.image.load(filename).convert_alpha()
        self.sprite_width = sprite_width
        self.sprite_height = sprite_height

    def get_sprite(self, col, row):
        """Extracts a single sprite from the sprite sheet based on column and row."""
        x = col * self.sprite_width
        y = row * self.sprite_height
        rectangle = pygame.Rect(x, y, self.sprite_width, self.sprite_height)
        sprite = self.sprite_sheet.subsurface(rectangle)
        return sprite
