const products = [
  {
    id: 1,
    name: 'Курица',
    type: 'белок',
    calories: 120,
    protein: 25,
    fat: 3,
    carbs: 0,
    category: ['завтрак', 'обед', 'ужин'],
  },
  {
    id: 2,
    name: 'Гречка',
    type: 'углеводы',
    calories: 110,
    protein: 4,
    fat: 2,
    carbs: 20,
    category: ['обед', 'ужин'],
  },
  // Еще продукты...
];

class NutritionPlanner {
  constructor(products) {
    this.products = products;
  }

  generateWeeklyMenu(bmi) {
    const weeklyMenu = {
      понедельник: this.generateDailyMenu(),
      вторник: this.generateDailyMenu(),
      среда: this.generateDailyMenu(),
      четверг: this.generateDailyMenu(),
      пятница: this.generateDailyMenu(),
      суббота: this.generateDailyMenu(),
      воскресенье: this.generateDailyMenu(),
    };

    return this.createNutritionTable(weeklyMenu);
  }

  generateDailyMenu() {
    return {
      завтрак: this.selectMealProducts('завтрак'),
      обед: this.selectMealProducts('обед'),
      ужин: this.selectMealProducts('ужин'),
    };
  }

  selectMealProducts(mealType) {
    return this.products
      .filter((product) => product.category.includes(mealType))
      .slice(0, 3); // Например, 3 продукта на прием пищи
  }

  createNutritionTable(weeklyMenu) {
    let tableHTML = `
        <table border="1">
            <thead>
                <tr>
                    <th>День</th>
                    <th>Завтрак</th>
                    <th>Обед</th>
                    <th>Ужин</th>
                </tr>
            </thead>
            <tbody>
        `;

    for (let [day, menu] of Object.entries(weeklyMenu)) {
      tableHTML += `
            <tr>
                <td>${day}</td>
                <td>${this.formatMealProducts(menu.завтрак)}</td>
                <td>${this.formatMealProducts(menu.обед)}</td>
                <td>${this.formatMealProducts(menu.ужин)}</td>
            </tr>
            `;
    }

    tableHTML += `
            </tbody>
        </table>
        `;

    return tableHTML;
  }

  formatMealProducts(products) {
    return products
      .map((product) => `${product.name} (${product.calories} ккал)`)
      .join('<br>');
  }
}

// Использование
function generateNutritionPlan() {
  // Допустим, ИМТ = 28
  const bmi = 28;
  const planner = new NutritionPlanner(products);

  // Генерируем таблицу
  const nutritionTable = planner.generateWeeklyMenu(bmi);

  // Вставляем в DOM
  document.getElementById('nutrition-plan').innerHTML = nutritionTable;
}

// HTML для отображения
/*
<div id="nutrition-plan"></div>
<button onclick="generateNutritionPlan()">Сгенерировать план питания</button>
*/

// Расширенная версия с более сложной логикой
class AdvancedNutritionPlanner extends NutritionPlanner {
  constructor(products) {
    super(products);
  }

  // Более сложный алгоритм выбора продуктов
  selectMealProducts(mealType, bmi) {
    // Фильтрация с учетом ИМТ и типа приема пищи
    return this.products
      .filter(
        (product) =>
          product.category.includes(mealType) &&
          this.checkProductSuitability(product, bmi)
      )
      .slice(0, 3);
  }

  checkProductSuitability(product, bmi) {
    // Логика подбора продуктов в зависимости от ИМТ
    if (bmi < 18.5) {
      return product.calories > 150; // Более калорийные
    } else if (bmi > 30) {
      return product.calories < 100; // Менее калорийные
    }
    return true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const block = document.querySelectorAll(
    '.js-store-product.js-product.t-store__product-snippet'
  );
  const widget = document.getElementById('rec866829933');

  setTimeout(() => {
    block.forEach((element) => {
      element.append(widget);
      console.log(block);
      console.log(widget);
    });
  }, 3000);
});
