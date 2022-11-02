from .types import Path


class Graph:
    def __init__(self):
        self._vertices = []
        self._edges = []
        self._paths = []
        self._max_length = 2

    def add_edge(self, route):
        if route.origin not in self._vertices:
            self._vertices.append(route.origin)

        if route.destination not in self._vertices:
            self._vertices.append(route.destination)

        self._edges.append(route)

    def _add_path(self, current):
        add = True
        for path in self._paths:
            if path == current:
                add = False

        if add:
            self._paths.append(current)
            return add

    def _find_adjacent(self, route, current, targets, visited):
        for other in self._edges:
            if (
                route != other
                and route.destination == other.origin
                and other not in visited
            ):
                current.add(other)
                visited.append(other)
                if other.destination in targets:
                    if self._add_path(current):
                        return
                    else:
                        current.remove(other)
                else:
                    self._find_adjacent(other, current, targets, visited)
                if len(current.routes) == self._max_length:
                    return

    def find_paths(self, origins, destinations):
        for edge in self._edges:
            if edge.origin in origins:
                current = Path()
                current.add(edge)
                visited = [edge]
                if edge.destination in destinations:
                    continue
                else:
                    self._find_adjacent(edge, current, destinations, visited)

        return self._paths
