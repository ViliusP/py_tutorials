# Example file showing a circle moving on screen
import pygame
from src.bullet import FireBullet
from src.sprite_sheet import SpriteSheet
from src.backaground import StaryNightBackground
from src.spacecraft import Spacecraft

# pygame setup
pygame.init()

screen_size = (1280, 720)
screen = pygame.display.set_mode(screen_size)
clock = pygame.time.Clock()
running = True
dt = 0

player_pos = pygame.Vector2(screen.get_width() / 2, screen.get_height() / 2)
background = StaryNightBackground(50, screen.get_size())
spacecraft = Spacecraft(player_pos, screen_size)

# -------
# Load the sprite sheet
sprite_sheet = SpriteSheet('./src/sprites/fire_bullet.png', 16, 16)
# Frame coordinates in the form of (column, row) pairs
frame_coords = [(16, 8), (17, 8), (18, 8), (19, 8)]
bullet = FireBullet(sprite_sheet, frame_coords, 0.25)  # Changing every quarter second
# --------
while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    events = pygame.event.get()
    for event in events:
        if event.type == pygame.QUIT:
            running = False

    bullet.update()
    
    screen.fill("black")

    spacecraft.update(dt, events)
    background.update(dt)

    background.draw(screen)
    spacecraft.draw(screen)
    bullet.draw(screen, (100, 100))  # Draw the animated sprite at position (100, 100)
    # flip() the display to put your work on screen
    pygame.display.flip()

    # limits FPS to 60
    # dt is delta time in seconds since last frame, used for framerate-
    # independent physics.
    dt = clock.tick(60) / 1000

pygame.quit()