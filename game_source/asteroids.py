# Example file showing a circle moving on screen
import pygame

from speed_indicator import SpeedIndicator

SCREEN_COLOR = (140, 107, 136)
SPEED_MULTIPLIERS = [1, 1.1, 1.2, 1.5, 1.7, 2]
BASE_SPEED = 300

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True
dt = 0
player_pos = pygame.Vector2(screen.get_width() / 2, screen.get_height() / 2)

speed_indicator = SpeedIndicator((screen.get_width()-20, 20), initial_speed_level=0)

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            keys = pygame.key.get_pressed()
            if keys[pygame.K_UP] and speed_indicator.level < len(SPEED_MULTIPLIERS)-1:
                speed_indicator.increase_speed()
                print(SPEED_MULTIPLIERS[speed_indicator.level])
            if keys[pygame.K_DOWN] and speed_indicator.level > 0:
                speed_indicator.decrease_speed()

                print(SPEED_MULTIPLIERS[speed_indicator.level])

    # fill the screen with a color to wipe away anything from last frame
    screen.fill(SCREEN_COLOR)
     
    pygame.draw.circle(screen, "red", player_pos, 40)
    speed_indicator.draw(screen)

    VELOCITY = BASE_SPEED * SPEED_MULTIPLIERS[speed_indicator.level]

    keys = pygame.key.get_pressed()
    if keys[pygame.K_w]:
        player_pos.y -= VELOCITY * dt
    if keys[pygame.K_s]:
        player_pos.y += VELOCITY * dt
    if keys[pygame.K_a]:
        player_pos.x -= VELOCITY * dt
    if keys[pygame.K_d]:
        player_pos.x += VELOCITY * dt
 
    # flip() the display to put your work on screen
    pygame.display.flip()

    # limits FPS to 60
    # dt is delta time in seconds since last frame, used for framerate-
    # independent physics.
    dt = clock.tick(60) / 1000

pygame.quit()

