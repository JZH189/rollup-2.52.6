import GlobalVariable from '../variables/GlobalVariable';
import UndefinedVariable from '../variables/UndefinedVariable';
import Variable from '../variables/Variable';
import Scope from './Scope';

export default class GlobalScope extends Scope {
	parent: null;

	constructor() {
		super();
		//{"included":false,"name":"undefined","alwaysRendered":false,"isId":false,"isReassigned":false,"renderBaseName":null,"renderName":null}
		this.variables.set('undefined', new UndefinedVariable());
	}

	findVariable(name: string): Variable {
		let variable = this.variables.get(name);
		if (!variable) {
			variable = new GlobalVariable(name);
			this.variables.set(name, variable);
		}
		return variable;
	}
}
