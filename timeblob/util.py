import string
import random

def create_rand_string(length):
    return ''.join(random.choice(string.ascii_letters + string.digits + " ") for _ in range(length))
