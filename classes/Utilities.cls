public class Utilities {

    @AuraEnabled(cacheable=true)
    global static List<Map<String, String>> getPickListValuesList(String fieldAndObjectApiName){

        List<String> apiNames = fieldAndObjectApiName.split('\\.');

        return getPickListValuesList(apiNames[0], apiNames[1]);
    }

    global static List<Map<String, String>> getPickListValuesList(String sobjectName, String fieldName){
        List<Map<String, String>> response = new List<Map<String, String>>();
        List<Schema.PicklistEntry> ple = getPickListValues(sobjectName, fieldName);

        for( Schema.PicklistEntry pickListVal : ple){

            if(pickListVal.isActive()){
                response.add(
                    new Map<String,String>{
                        'value' => pickListVal.getValue(),
                        'label' => pickListVal.getLabel(),
                        'default' => String.valueOf(pickListVal.isDefaultValue())
                    }
                );
            }
        }
        return response;
    }
}
