import numpy as np
import matplotlib.pyplot as plt
import matplotlib
import matplotlib.patches as patches
from matplotlib.patches import FancyArrowPatch
from matplotlib.patches import Arrow
import matplotlib.cm as cm
import os
from matplotlib.ticker import FuncFormatter

GRAPHS_DIR = './graphs_generation'

# Formatter function to hide zero
def hide_zero_tick(x, pos):
    """Hide the zero and return the tick label for all other ticks."""
    return '' if x == 0 else f'{x}'



def draw_graph(func, domain, steps, y_range=None, y_step=None, filename='custom_function_plot.pdf'):
    with plt.xkcd():
        plt.rcParams.update({
            'grid.linewidth': 0.5,
            'axes.grid': True,
        })

        # Generate x values
        x = np.linspace(domain[0], domain[1], steps)
        
        # Evaluate the function
        y = func(x)

        # Create figure and axis
        fig, ax = plt.subplots()

        # Plot function
        ax.plot(x, y)

        # Set domain and range if specified
        ax.set_xlim(domain)
        if y_range is not None:
            ax.set_ylim(y_range)

        if y_step is not None and y_range is not None:
            y_ticks = np.arange(y_range[0], y_range[1] + y_step, y_step)
            ax.set_yticks(y_ticks)

        ax.xaxis.set_major_formatter(FuncFormatter(hide_zero_tick))
        ax.yaxis.set_major_formatter(FuncFormatter(hide_zero_tick))

        # Setting up the aspect ratio
        ax.set_aspect('equal', adjustable='datalim')
 
                        
        # Grid and zero-lines
        ax.axhline(0, color='black',linewidth=0.5)
        ax.axvline(0, color='black',linewidth=0.5)
        ax.grid(True, which='both', linestyle='--', linewidth=0.5)

        # Removing the top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)

        # Moving bottom spine to zero position
        ax.spines['bottom'].set_position('zero')
        ax.spines['left'].set_position('zero')
        


        # Manually adjusting the zero label to be offset
        # Calculate a small offset  
        offset_x = (domain[1] - domain[0]) * -0.04
        offset_y = (y_range[1] - y_range[0]) * 0.02 if y_range else 0.1
        ax.text(-offset_x, -offset_y, "0", ha='right', va='top', fontsize=14)

        # Adding arrowheads away from the origin with increased z-order
        ax.plot(1, 0, ls="", marker=">", ms=5, color="k", transform=ax.get_yaxis_transform(), clip_on=False, zorder=1000)
        if y_range:
            ax.plot(0, 1, ls="", marker="^", ms=5, color="k", transform=ax.get_xaxis_transform(), clip_on=False, zorder=3)

        # Ensure the directory exists
        os.makedirs(GRAPHS_DIR, exist_ok=True)

        # Save the plot with the provided filename
        full_path = os.path.join(GRAPHS_DIR, filename)
        plt.savefig(full_path, bbox_inches='tight')
        plt.show()  # Display the plot

# Pre
matplotlib.font_manager._load_fontmanager(try_read_cache=False)

# Example usage
def sin_func(x):
    return np.sin(x)

def transformed_sin_func(x):
    return 0.5*np.sin(x)+0.5

# Generation start
draw_graph(sin_func, domain=(-2*np.pi, 2*np.pi), steps=1000, y_range=(-4, 4), y_step = 1, filename='sin_plot.png')
draw_graph(transformed_sin_func, domain=(-2*np.pi, 2*np.pi), steps=1000, y_range=(-4, 4), y_step = 1, filename='sin_transformed_plot.png')