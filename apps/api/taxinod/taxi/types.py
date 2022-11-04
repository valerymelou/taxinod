class Path:
    def __init__(self):
        self.routes = []

    def add(self, route):
        if route not in self.routes:
            self.routes.append(route)
            return True

        return False

    def remove(self, route):
        if route in self.routes:
            self.routes.remove(route)
