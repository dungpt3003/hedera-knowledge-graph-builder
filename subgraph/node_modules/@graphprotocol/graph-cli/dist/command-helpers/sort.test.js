"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const sort_1 = require("./sort"); // adjust the import based on your file structure
(0, vitest_1.describe)('sortWithPriority', () => {
    (0, vitest_1.it)('should sort numbers with specific priority elements', () => {
        const numbers = [5, 3, 9, 1, 4];
        const priorityNumbers = [9, 1];
        const result = (0, sort_1.sortWithPriority)(numbers, priorityNumbers);
        (0, vitest_1.expect)(result).toEqual([1, 9, 3, 4, 5]);
    });
    (0, vitest_1.it)('should default sort numbers if no priority specifier', () => {
        const numbers = [5, 3, 9, 1, 4];
        const result = (0, sort_1.sortWithPriority)(numbers);
        (0, vitest_1.expect)(result).toEqual([1, 3, 4, 5, 9]);
    });
    (0, vitest_1.it)('should sort strings with priority determined by a function', () => {
        const fruits = ['apple', 'orange', 'banana', 'mango', 'kiwi', 'melon'];
        const sortedFruits = (0, sort_1.sortWithPriority)(fruits, fruit => fruit.startsWith('m'));
        (0, vitest_1.expect)(sortedFruits).toEqual(['mango', 'melon', 'apple', 'banana', 'kiwi', 'orange']);
    });
    (0, vitest_1.it)('should handle an empty array', () => {
        const emptyArray = [];
        const result = (0, sort_1.sortWithPriority)(emptyArray, x => x > 3);
        (0, vitest_1.expect)(result).toEqual([]);
    });
    (0, vitest_1.it)('should sort using a custom compare function', () => {
        const numbers = [5, 3, 9, 1, 4];
        const priorityNumbers = [9, 1];
        const result = (0, sort_1.sortWithPriority)(numbers, priorityNumbers, (a, b) => a - b);
        (0, vitest_1.expect)(result).toEqual([1, 9, 3, 4, 5]);
    });
});
