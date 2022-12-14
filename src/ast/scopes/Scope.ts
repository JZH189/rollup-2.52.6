import { AstContext } from '../../Module';
import Identifier from '../nodes/Identifier';
import { ExpressionEntity } from '../nodes/shared/Expression';
import { UNDEFINED_EXPRESSION } from '../values';
import LocalVariable from '../variables/LocalVariable';
import Variable from '../variables/Variable';
import ChildScope from './ChildScope';

export default class Scope {
	children: ChildScope[] = [];      //子作用域
	variables = new Map<string, Variable>();    //收集变量

	addDeclaration(
		identifier: Identifier,
		context: AstContext,
		init: ExpressionEntity | null,
		_isHoisted: boolean
	): LocalVariable {
		const name = identifier.name;
		let variable = this.variables.get(name) as LocalVariable;
		if (variable) {
			variable.addDeclaration(identifier, init);
		} else {
			variable = new LocalVariable(
				identifier.name,
				identifier,
				init || UNDEFINED_EXPRESSION,
				context
			);
			this.variables.set(name, variable);
		}
		return variable;
	}
  // 判断 variables 内是否包含这个变量
	contains(name: string): boolean {
		return this.variables.has(name);
	}

	findVariable(_name: string): Variable {
		throw new Error('Internal Error: findVariable needs to be implemented by a subclass');
	}
}
