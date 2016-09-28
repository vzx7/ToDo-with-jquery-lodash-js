/**
* namespace
* @param {Object}   d = document
* @param {Object}   l = location
* @return {Object}  s = localStorage
*/
;(function(d, l, s) { 
    "use strict";
    var that = this,
    tasks = JSON.parse(s.getItem("tasks_jquery"));
    /**
    * Sorting elements
    * @param {Boolean} type
    * @return {Function}
    */

    function sortElements(type) {
            return function(a, b) {
            var one = a.task || a;
            var two = b.task || b;

            if (one < two) {
                return type ? 1 : -1;
            } else if (one > two) {
                return type ? -1 : 1;
            } else {
                return 0;
            }
        };
    }

    // create property-Object Module ToDo
    that.ToDo = {
        /**
        * Object ToDo
        */
        tasks: tasks || [],
        /**
        * The method to create a table task list
        * @param {Boolean} typeSorting
        * @return {action}
        */
        creatorTableTasks: function(typeSorting) { 
        	if (this.tasks.length > 0) {
        		this.sorterTable(typeSorting);
                var i;

                $('.todo-tbody').empty();

                for (i = 0; i <= (this.tasks.length - 1); i++) { 
                    $('.todo-tbody').append(this.generaterTemplate('tr_temp',{
                    	title: this.tasks[i].task,
                    	oreder: this.tasks[i].order,
                    	complited: this.tasks[i].check ? true : false
                    }));
                }
            } else {
                $('#welcome_message').show();
                $('#todo_form').hide();
            }
        },

        addTask: function(title) {
        	if (this.tasks.length > 0) {
				this.tasks.push({
	                task: title,
	                check: false,
	                order: ToDo.tasks.length
	            });
	        } else {
                this.tasks = [{
	                task: title,
	                check: false,
	                order: 0
	            }];

	            $('#welcome_message').hide();
                $('#todo_form').show();
	        }

	        $('#new_task').val('');
	        s.setItem("tasks_jquery", JSON.stringify(this.tasks));
	        ToDo.creatorTableTasks(true);
        },
        /**
        * The method of setting the task list storage
        * @param {Array} arrComplited
        * @param {Array} arrDeleted
        * @param {Array} arrTitles
        * @return {action}
        */
        customizerTasks: function(order, type, option) {
            switch(type) {
            	case 'delete':
            		this.tasks.forEach(function(element, index) {
            			if (order == element.order) {
            				that.ToDo.tasks.splice(index, 1);
            			}
            		});
            	break;
            	case 'done':
            		this.tasks.forEach(function(element, index) {
            			if (order == element.order) { 
            				that.ToDo.tasks[index].check = option;
            			}
            		});
            	break;
            	case 'edit':
            		this.tasks.forEach(function(element, index) {
            			if (order == element.order) {
            				that.ToDo.tasks[index].task = option;
            			}
            		});
            	break;
            }
        },
        /**
        * The method of sorting by Title field
        * @param {Boolean} type
        * @return {void}
        */
        sorterTable: function(type) {
        	ToDo.tasks.sort(sortElements(type));

        	if (!type && !$('#tab_sort').hasClass('active-sort')) { 
        		$('#tab_sort').addClass('active-sort');
        	} else {
        		$('#tab_sort').removeClass('active-sort');
        	}
        	
        },
        /**
        * The method generation templates
        * @param {String} template
        * @param {Object} data
        * @return {void}
        */
        generaterTemplate: function(template, data) { 
			var tmpl = _.template(document.getElementById(template).innerHTML);
			return tmpl(data);
		},
    };
}.call(window, document, location, localStorage));