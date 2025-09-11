from utils.displayer import Displayer
from itertools import permutations, combinations

class String(Displayer):
    def __init__(self, initial: str = ""):
        self.string = initial
        self.logger = Displayer.get_logger("Strings", arrays=True)

    # ------------------ Mutating Methods ------------------
    @Displayer.array_displayer("Append Character")
    def append(self, ch: str):
        self.string += ch
        self.logger.info(f"Appended '{ch}' -> {self.string}")

    @Displayer.array_displayer("Prepend Character")
    def prepend(self, ch: str):
        self.string = ch + self.string
        self.logger.info(f"Prepended '{ch}' -> {self.string}")

    @Displayer.array_displayer("Insert Character")
    def insert_at_position(self, ch: str, pos: int):
        if pos < 0 or pos > len(self.string):
            self.logger.info("Invalid position")
            return
        self.string = self.string[:pos] + ch + self.string[pos:]
        self.logger.info(f"Inserted '{ch}' at {pos} -> {self.string}")

    @Displayer.array_displayer("Delete Character")
    def delete(self, pos=None, start=False, end=False):
        if not self.string:
            self.logger.info("String is empty")
            return

        if start:
            deleted = self.string[0]
            self.string = self.string[1:]
            self.logger.info(f"Deleted first char: {deleted} -> {self.string}")
        elif end:
            deleted = self.string[-1]
            self.string = self.string[:-1]
            self.logger.info(f"Deleted last char: {deleted} -> {self.string}")
        elif pos is not None:
            if pos < 0 or pos >= len(self.string):
                self.logger.info("Invalid position")
                return
            deleted = self.string[pos]
            self.string = self.string[:pos] + self.string[pos+1:]
            self.logger.info(f"Deleted char '{deleted}' at pos {pos} -> {self.string}")
        else:
            self.logger.info("Specify start, end, or pos")

    @Displayer.array_displayer("Remove Duplicates")
    def duplicates(self, remove=False):
        seen = {}
        found = False

        for i, ch in enumerate(self.string):
            if ch in seen:
                self.logger.info(
                    f"Duplicate found: '{ch}' at index {i} (first seen at {seen[ch]})"
                )
                found = True
            else:
                seen[ch] = i

        if not found:
            self.logger.info("No Duplicates Found")

        if remove and found:
            unique = []
            for ch in self.string:
                if ch not in unique:
                    unique.append(ch)
            self.string = "".join(unique)
            self.logger.info(f"String after removing duplicates: {self.string}")

    # ------------------ Non-Mutating Methods ------------------
    @Displayer.array_displayer("Find Character")
    def search_character(self, ch: str):
        for i, c in enumerate(self.string):
            if c == ch:
                self.logger.info(f"Value '{ch}' found at index {i}!")
                return i
        self.logger.info(f"'{ch}' not found")
        return -1

    @Displayer.array_displayer("Palindrome Check")
    def is_palindrome(self):
        if self.string.lower() == self.string[::-1].lower():
            self.logger.info("String is Palindrome")
            return True
        else:
            self.logger.info("String is not Palindrome")
            return False

    @Displayer.array_displayer("Anagram Check")
    def is_anagram(self, other: str):
        if sorted(self.string.lower()) == sorted(other.lower()):
            self.logger.info("Words are Anagram")
            return True
        else:
            self.logger.info("Words are not Anagram")
            return False

    @Displayer.array_displayer("Permutations & Combinations")
    def maths(self):
        if not self.string:
            self.logger.info("String is empty")
            return

        length = len(self.string)
        perms_count = len(list(permutations(self.string)))
        combs_count = sum(
            len(list(combinations(self.string, r))) for r in range(1, len(self.string) + 1)
        )

        self.logger.info("---------------------------------")
        self.logger.info(f"length = {length}")
        self.logger.info(f"permutations count = {perms_count}")
        self.logger.info(f"combinations count = {combs_count}")
        self.logger.info("---------------------------------")

# ------------------ Example Usage ------------------
if __name__ == "__main__":
    s = String("Siddhant Gupta")
    s.append("X")
    s.prepend("Y")
    s.insert_at_position("Z", 3)
    s.delete(start=True)
    s.delete(end=True)
    s.delete(pos=2)
    s.duplicates(remove=True)
    s.search_character("G")
    
    s2 = String("Level")
    s2.is_palindrome()

    s3 = String("sidhxntt")
    s3.duplicates(remove=True)

    s4 = String("listen")
    s4.is_anagram("silent")

    s5 = String("ABC")
    s5.maths()
