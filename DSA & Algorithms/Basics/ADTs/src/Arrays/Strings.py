from Basics.ADTs.src.utils.displayer import Displayer
from itertools import permutations, combinations

class Strings(Displayer):
    def __init__(self, text: str = ""):
        self.string = text
        self.logger = Displayer.get_logger("Strings")

    # ------------------ Mutating Methods ------------------

    @Displayer.displayer("Update String")
    def update(self, new_text: str):
        self.string = new_text
        self.logger.info(f"Updated string -> {self.string}")

    @Displayer.displayer("Append Character")
    def append(self, ch: str):
        self.string += ch
        self.logger.info(f"Appended '{ch}' -> {self.string}")

    @Displayer.displayer("Prepend Character")
    def prepend(self, ch: str):
        self.string = ch + self.string
        self.logger.info(f"Prepended '{ch}' -> {self.string}")

    @Displayer.displayer("Insert Character")
    def insert(self, ch: str, pos: int):
        if pos < 0 or pos > len(self.string):
            self.logger.info("Invalid position")
            return
        self.string = self.string[:pos] + ch + self.string[pos:]
        self.logger.info(f"Inserted '{ch}' at {pos} -> {self.string}")

    @Displayer.displayer("Delete Character")
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
            self.string = self.string[:pos] + self.string[pos + 1:]
            self.logger.info(f"Deleted char '{deleted}' at pos {pos} -> {self.string}")

        else:
            self.logger.info("Specify start, end, or pos")

    @Displayer.displayer("Remove Duplicates")
    def duplicates(self, remove=False):
        seen = {}
        found = False
        for i, ch in enumerate(self.string):
            if ch in seen:
                self.logger.info(f"Duplicate found: '{ch}' at index {i} (first seen at {seen[ch]})")
                found = True
            else:
                seen[ch] = i
        if not found:
            self.logger.info("No Duplicates Found")

        if remove and found:
            new_str = "".join(dict.fromkeys(self.string))  # order-preserving dedup
            self.string = new_str
            self.logger.info(f"String after removing duplicates: {self.string}")

    # ------------------ Non-Mutating Methods ------------------

    @Displayer.displayer("Find Character")
    def find_char(self, ch: str):
        if ch in self.string:
            i = self.string.find(ch)
            self.logger.info(f"Value '{ch}' found at index {i}!")    
            return i
        else:
            self.logger.warning(f"Value '{ch}' not found!")
            return -1

    @Displayer.displayer("Palindrome Check")
    def palindrome_check(self):
        s = self.string.lower()
        if s[::-1] == s:
            self.logger.info("String is Palindrome")    
            return True
        else:
            self.logger.warning("String is NOT Palindrome")   
            return False

    @Displayer.displayer("Anagram Check")
    def anagram_check(self, *words: str):
        base_word = sorted(self.string.lower())
        for word in words:
            if sorted(word.lower()) != base_word:
                self.logger.info("Words are NOT Anagram")  
                return False
        self.logger.info("Words are Anagram")  
        return True

    @Displayer.displayer("Permutations & Combinations")
    def maths(self):
        length = len(self.string)
        if length == 0:
            self.logger.info("String is empty")
            return

        perms_count = len(list(permutations(self.string)))
        combs_count = sum(len(list(combinations(self.string, r))) for r in range(1, length + 1))

        self.logger.info("---------------------------------")
        self.logger.info(f"length = {length}")
        self.logger.info(f"permutations count = {perms_count}")
        self.logger.info(f"combinations count = {combs_count}")
        self.logger.info("---------------------------------")


# ------------------ Example Usage ------------------
if __name__ == "__main__":
    s = Strings("Siddhant Gupta")

    # Mutating methods
    s.append("X")
    s.prepend("Y")
    s.insert("Z", 3)
    s.delete(start=True)
    s.delete(end=True)
    s.delete(pos=2)
    s.duplicates(remove=True)

    # Non-Mutating methods
    s.find_char("G")
    palindrome = Strings("Level")
    palindrome.palindrome_check()

    username = Strings("sidhxntt")
    username.duplicates()

    anagram = Strings("listen")
    anagram.anagram_check("silent", "enlist")

    pc = Strings("ABC")
    pc.maths()