import type { ProgrammingLanguage } from "@/types/analysis"

export interface SampleSnippet {
  id: string
  label: string
  kind: "buggy" | "clean"
  code: string
}

export const LANGUAGE_LABELS: Record<ProgrammingLanguage, string> = {
  c: "C",
  cpp: "C++",
}

export const LANGUAGE_FILE_EXTENSIONS: Record<ProgrammingLanguage, string[]> = {
  c: [".c", ".h"],
  cpp: [".cpp", ".cc", ".hpp"],
}

export const MONACO_LANGUAGE_IDS: Record<ProgrammingLanguage, string> = {
  c: "c",
  cpp: "cpp",
}

export const SAMPLE_SNIPPETS: Record<ProgrammingLanguage, SampleSnippet[]> = {
  c: [
    {
      id: "c-buggy-1",
      label: "Buggy: unsafe buffer copy",
      kind: "buggy",
      code: `#include <stdio.h>
#include <string.h>

void greet(char *name) {
    char buffer[16];
    strcpy(buffer, name);
    printf("Hello, %s!\\n", buffer);
}

int main() {
    greet("This name is way too long for the buffer");
    return 0;
}`,
    },
    {
      id: "c-clean-1",
      label: "Clean: bounded copy",
      kind: "clean",
      code: `#include <stdio.h>
#include <string.h>

void greet(const char *name) {
    char buffer[16];
    strncpy(buffer, name, sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\\0';
    printf("Hello, %s!\\n", buffer);
}

int main() {
    greet("Ada");
    return 0;
}`,
    },
  ],
  cpp: [
    {
      id: "cpp-buggy-1",
      label: "Buggy: out-of-bounds access",
      kind: "buggy",
      code: `#include <vector>
#include <iostream>

int lastElement(std::vector<int>& nums) {
    return nums[nums.size()];
}

int main() {
    std::vector<int> nums = {1, 2, 3};
    std::cout << lastElement(nums) << std::endl;
}`,
    },
    {
      id: "cpp-clean-1",
      label: "Clean: bounds-checked access",
      kind: "clean",
      code: `#include <vector>
#include <iostream>

int lastElement(const std::vector<int>& nums) {
    if (nums.empty()) return -1;
    return nums[nums.size() - 1];
}

int main() {
    std::vector<int> nums = {1, 2, 3};
    std::cout << lastElement(nums) << std::endl;
}`,
    },
  ],
}