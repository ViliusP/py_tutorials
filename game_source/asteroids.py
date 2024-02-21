# Example file showing a circle moving on screen
import pygame

SCREEN_COLOR = (140, 107, 136)
SPEED_MULTIPLIERS = [1, 1.1, 1.2, 1.5, 1.7, 2]
BASE_SPEED = 300

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True
dt = 0
speed_multiplier_index=0
player_pos = pygame.Vector2(screen.get_width() / 2, screen.get_height() / 2)

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            keys = pygame.key.get_pressed()
            if keys[pygame.K_UP] and speed_multiplier_index < len(SPEED_MULTIPLIERS)-1:
                speed_multiplier_index+=1
                print(SPEED_MULTIPLIERS[speed_multiplier_index])
            if keys[pygame.K_DOWN] and speed_multiplier_index > 0:
                speed_multiplier_index-=1
                print(SPEED_MULTIPLIERS[speed_multiplier_index])

    # fill the screen with a color to wipe away anything from last frame
    screen.fill(SCREEN_COLOR)

    pygame.draw.circle(screen, "red", player_pos, 40)

    VELOCITY = BASE_SPEED * SPEED_MULTIPLIERS[speed_multiplier_index]

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