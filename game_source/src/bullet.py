import time
import pygame

from src.sprite_sheet import SpriteSheet


class FireBullet():
    def __init__(self, sprite_sheet: SpriteSheet, frame_coords, frame_duration, scale_factor=2):
        """Initialize the animated sprite with multiple frames defined by coordinates."""
        self.frames = []
        for col, row in frame_coords:
            sprite = sprite_sheet.get_sprite(col, row)
            resized_sprite = pygame.transform.smoothscale_by(sprite, 2)
            self.frames.append(resized_sprite)

        self.current_frame = 0
        self.num_frames = len(self.frames)
        self.frame_duration = frame_duration
        self.last_update = time.time()

    def update(self):
        """Update the sprite to animate it based on time."""
        now = time.time()
        if now - self.last_update > self.frame_duration:
            self.current_frame = (self.current_frame + 1) % self.num_frames
            self.last_update = now

    def draw(self, screen: pygame.Surface, position):
        """Draw the current frame of the sprite at the given position."""
        screen.blit(self.frames[self.current_frame], position)